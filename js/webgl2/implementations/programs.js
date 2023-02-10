import * as VertexShaders from './vertex-shaders.js';
import * as FragShaders from './frag-shaders.js';
import { Program } from '../core/webgl2.js';

export const celestialSphere = new Program({
	vertexShader: VertexShaders.celestialSphere,
	fragShader:   FragShaders.coloredGeometry,
});
export const celestialSphereL = new Program({
	vertexShader: VertexShaders.celestialSphereL,
	fragShader:   FragShaders.coloredGeometry,
});
export const celestialSphereR = new Program({
	vertexShader: VertexShaders.celestialSphereR,
	fragShader:   FragShaders.coloredGeometry,
});

export const variableColorGeometry = new Program({
	vertexShader: VertexShaders.justGeometry,
	fragShader:   FragShaders.uniformColor,
});
export const variableColorGeometryL = new Program({
	vertexShader: VertexShaders.justGeometryL,
	fragShader:   FragShaders.uniformColor,
});
export const variableColorGeometryR = new Program({
	vertexShader: VertexShaders.justGeometryR,
	fragShader:   FragShaders.uniformColor,
});

export const orthographic = new Program({
	vertexShader: VertexShaders.orthographic,
	fragShader:   FragShaders.uniformColor,
});
export const orthographicL = new Program({
	vertexShader: VertexShaders.orthographicL,
	fragShader:   FragShaders.uniformColor,
});
export const orthographicR = new Program({
	vertexShader: VertexShaders.orthographicR,
	fragShader:   FragShaders.uniformColor,
});
