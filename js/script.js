window.onload = function () {
    const canvas = document.getElementById("casa");
    const webgl = new WebGL(canvas);

    const verticesTelhado = [0, 0.5, -0.5, 0, 0.5, 0];
    const verticesParede = [-0.5, 0, 0.5, 0, 0.5, -1, -0.5, -1];
    const verticesPorta = [-0.15, -0.4, 0.15, -0.4, 0.15, -1, -0.15, -1];
    const verticesJanelaEsquerda = [
        -0.45, -0.45, -0.25, -0.45, -0.25, -0.75, -0.45, -0.75,
    ];
    const verticesJanelaDireita = [
        0.25, -0.45, 0.45, -0.45, 0.45, -0.75, 0.25, -0.75,
    ];

    webgl.desenhar(verticesTelhado, 1, 3);
    webgl.desenhar(verticesParede, 2, 4);
    webgl.desenhar(verticesPorta, 3, 4);
    webgl.desenhar(verticesJanelaEsquerda, 4, 4);
    webgl.desenhar(verticesJanelaDireita, 4, 4);
};