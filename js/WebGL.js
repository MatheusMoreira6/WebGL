class WebGL {
    constructor(canvas) {
        if (!canvas || canvas.nodeName !== "CANVAS" || typeof canvas.getContext !== "function") {
            throw new Error("O elemento fornecido não é um canvas!");
        }

        this.canvas = canvas;
        this.gl = canvas.getContext("webgl");

        if (!this.gl) {
            throw new Error("WebGL não suportado!");
        }

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        this.fragmentShaderSource = `
            precision mediump float;
            uniform vec4 color;
            void main() {
                gl_FragColor = color;
            }
        `;

        this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(this.vertexShader, this.vertexShaderSource);
        this.gl.compileShader(this.vertexShader);

        this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(this.fragmentShader, this.fragmentShaderSource);
        this.gl.compileShader(this.fragmentShader);

        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);

        this.positionAttributeLocation = this.gl.getAttribLocation(
            this.program,
            "position"
        );
        this.gl.enableVertexAttribArray(this.positionAttributeLocation);

        this.colorUniformLocation = this.gl.getUniformLocation(
            this.program,
            "color"
        );

        this.positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    }

    desenhar(arrayVertices, cor, quantidadeVertices) {
        if (quantidadeVertices < 3 || quantidadeVertices > 4) {
            throw new Error("Quantidade de vertices não suportado!");
        }

        this.gl.vertexAttribPointer(this.positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(arrayVertices),
            this.gl.STATIC_DRAW
        );

        switch (cor) {
            case 1:
                this.gl.uniform4f(this.colorUniformLocation, 1, 0, 0, 1); // Vermelho
                break;
            case 2:
                this.gl.uniform4f(this.colorUniformLocation, 0, 1, 0, 1); // Verde;
                break;
            case 3:
                this.gl.uniform4f(this.colorUniformLocation, 0.54, 0.27, 0.07, 1); // Marrom
                break;
            case 4:
                this.gl.uniform4f(this.colorUniformLocation, 0.5, 0.5, 0.5, 1); // Cinza
                break;
        }

        this.gl.drawArrays(quantidadeVertices == 3 ? this.gl.TRIANGLES : this.gl.TRIANGLE_FAN, 0, parseInt(quantidadeVertices));
    }
}
