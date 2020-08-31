const photoShader = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  float random(float x) {
    return fract(sin(x) * 100000.0);
  }

  float random2(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random2(i);
    float b = random2(i + vec2(1.0, 0.0));
    float c = random2(i + vec2(0.0, 1.0));
    float d = random2(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f * f * (3.0 - 2.0 * f);
    // u = smoothstep(0.0, 1.0, f);

    // Mix 4 corners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
  }

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform sampler2D u_texture;

  vec4 WHITE = vec4(1.0);
  vec4 BLUE = vec4(0.0, 0.0, 1.0, 1.0);

  void main() {
    float scale = 5.0 + 35.0 * (sin(u_time) + 1.0);
    vec2 st = (gl_FragCoord.xy + vec2(0.5)) / u_resolution.xy;
    vec2 pix = floor(scale * st) / scale;
    float noiseValue = noise(vec2(pix.x + sin(u_time), pix.y - cos(u_time)));
    bool shouldPix = noiseValue > 0.5;
    vec2 where = shouldPix ? pix : st;
    vec4 color = texture2D(u_texture, where);
    if (shouldPix) {
      color.r += pow(max(noiseValue - 0.6, 0.0), 1.5);
      color.g += pow(max(noiseValue - 0.6, 0.0), 1.5);
      color.b += pow(max(noiseValue - 0.6, 0.0), 1.5);
    }
    gl_FragColor = color;
  }
`;

export default photoShader;
