var geometria = new THREE.BoxGeometry( 1, 1, 1 )
var material = new THREE.MeshNormalMaterial()
var cubo = new THREE.Mesh( geometria, material )
var cena = new THREE.Scene()
cena.add( cubo )

var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera( 1, 1, 0.1, 1000)

container = document.getElementById('container');
renderer.setSize($(container).width(), $(container).height());
container.appendChild(renderer.domElement);

renderer.render( cena, camera )

animar();

var needsResize = false;
function updateViewport() {
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    camera.fov = window.innerHeight / window.screen.height;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
updateViewport();


function animar() 
{
    if ( needsResize ) {
        needsResize = false;
        updateViewport();
    }
    requestAnimationFrame( animar )
    // mostrar...
    renderer.render( cena, camera )
    // atualizar posição do cubo
    cubo.rotateX(0.01)
    cubo.rotateY(0.02)
}

window.addEventListener('resize', function(){needsResize = true}); 