import Constants from '../../constants.js';
import { Mat4, Vec3 } from '../core/gl-math.js';
import { Geometry } from '../core/webgl2.js';

export const horizon = ({ dip, radius }) => {
	const tanDip = Math.tan(dip);
	const y = - tanDip*radius/(tanDip + 1);
	const topRadius = radius + y;
	const attr = [ 0, -radius, 0 ];
	const element = [];
	const n = 50;
	for (let i=0; i<=n; ++i) {
		const norm = 2*i/n - 1;
		const shift = norm*Math.pow(Math.abs(norm), 1.5);
		const angle = Math.PI*0.5*shift;
		const x = Math.sin(angle)*topRadius;
		const z = Math.cos(angle)*topRadius;
		attr.push(x, y, z);
	}
	for (let i=0; i<n; ++i) {
		element.push(0, i + 1, i + 2);
	}
	element.push(0, 1, 2);
	return new Geometry({
		attr, element,
		layout: [ 3 ],
	});
};

const MIN_MAG = -1.45;
const normalizeMag = (mag) => Math.pow(Math.pow(2.512, MIN_MAG - mag), 0.25);
const calcOpacity = (normalMag, radScalar) => {
	const normalMagArea = Math.PI*normalMag*normalMag;
	const scaledRadArea = Math.PI*radScalar*radScalar;
	const opacity = normalMagArea/scaledRadArea;
	return opacity;
};

export const celestialSphere = (stars) => {
	const attr = [];
	const element = [];
	const nVertices = 5;
	const angleStep = Math.PI*2/nVertices;
	let nStars = 0;
	const decToXRot = (dec) => dec/180*Math.PI;
	const raToZRot = (ra) => - ra/12*Math.PI;
	const addStar = ({ ra, dec, vmag }) => {
		const color = [ 1, 1, 1 ];
		const planarRad = Math.tan(Constants.STAR_ANGULAR_SIZE/2);
		const mat4 = new Mat4().rotateX(decToXRot(dec)).rotateZ(raToZRot(ra));
		const pivot = new Vec3([ 0, 1, 0 ]).apply(mat4);
		const normalMag = normalizeMag(vmag);
		const radScalar = Math.pow(normalMag, 0.7);
		const opacity = calcOpacity(normalMag, radScalar);
		const rad = planarRad*radScalar;
		for (let i=0; i<nVertices; ++i) {
			const angle = i*angleStep;
			const sin = Math.sin(angle)*rad;
			const cos = Math.cos(angle)*rad;
			const x = sin;
			const y = 1;
			const z = cos;
			const edge = new Vec3([ x, y, z ]).normalize().apply(mat4);
			attr.push(...edge, ...pivot, ...color, opacity);
		}
		const b = (nStars++)*nVertices;
		for (let i=2; i<nVertices; ++i) {
			element.push(b, b + i - 1, b + i);
		}
	};
	stars.forEach(addStar);
	return new Geometry({ attr, element, layout: [ 3, 3, 3, 1 ] });
};
