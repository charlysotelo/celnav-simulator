import { VertexShader } from '../core/webgl2.js';

const c1 = Math.PI/180;
const c2 = 180/Math.PI;
const c3 = 5.11;
const c4 = 10.3*c1;
const c5 = 0.017*c1;

export const celestialSphere = new VertexShader(`
	#version 300 es
	precision highp float;

	layout (location = 0) in vec3 inVertex;
	layout (location = 1) in vec3 inColor;

	uniform mat4 transform;
	uniform mat4 projection;

	out vec3 color;

	float correctY(float y) {
		float h = asin(y)*${c2};
		if (h < -2.0 || h > 89.9) return y;
		float dif = (sin(h*${c1} + ${c5}/tan(h*${c1} + ${c4}/(h + ${c3}))) - y)*0.99;
		return y + dif;
	}

	vec3 addRefraction(vec3 vertex) {
		vertex.y = correctY(vertex.y);
		float base = sqrt(1.0 - vertex.y*vertex.y);
		vertex.xz = normalize(vertex.xz)*base;
		return vertex;
	}

	void main() {
		color = inColor;
		vec3 vertex = inVertex*mat3(transform);
		vertex = addRefraction(vertex);
		gl_Position = vec4(vertex, 1.0)*projection;
	}
`);

export const justGeometry = new VertexShader(`
	#version 300 es
	precision highp float;

	layout (location = 0) in vec3 inVertex;

	uniform mat4 transform;
	uniform mat4 projection;

	void main() {
		gl_Position = vec4(inVertex, 1.0)*transform*projection;
	}
`);

export const orthographic = new VertexShader(`
	#version 300 es
	precision highp float;

	layout (location = 0) in vec3 inVertex;
	layout (location = 1) in vec3 inColor;

	uniform vec2 screenPos;
	uniform float scale;
	uniform float screenRatio;

	out vec3 color;

	void main() {
		color = inColor;
		vec3 vertex = inVertex;
		vertex.x /= screenRatio;
		vertex.xy *= scale;
		vertex.xy += screenPos;
		gl_Position = vec4(vertex, 1.0);
	}
`);
