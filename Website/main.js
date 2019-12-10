

var container = document.getElementById('canvas');

var geometria = new THREE.BoxGeometry( 1, 1, 1 )
var material = new THREE.MeshNormalMaterial()
var cubo = new THREE.Mesh( geometria, material )
var cena = new THREE.Scene()
cena.add( cubo )
var renderer = new THREE.WebGLRenderer({canvas : canvas})
container.appendChild(renderer.domElement);
var camara = new THREE.PerspectiveCamera( 70, 800 / 600, 0.01, 1000)
camara.position.z = 5


camera.aspect = container.clientWidth / container.clientHeight;
camera.updateProjectionMatrix();
renderer.setSize(container.clientWidth, container.clientHeight);

renderer.render( cena, camara )

animar();

function animar() 
{
    requestAnimationFrame( animar )
    // mostrar...
    renderer.render( cena, camara )
    // atualizar posição do cubo
    cubo.rotateX(0.01)
    cubo.rotateY(0.02)
}