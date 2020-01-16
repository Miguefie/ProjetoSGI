

function main() 
{
    var colorButton = document.getElementById("colorButton");
    const canvas = document.querySelector('#container');
    const renderer = new THREE.WebGLRenderer({canvas});
    const camera = new THREE.PerspectiveCamera( 45, 2, 1, 1000);
    camera.position.z = 2;

    var controlos = new THREE.OrbitControls( camera, renderer.domElement );
    controlos.enablePan = false;
    controlos.maxDistance = 5;



    const scene = new THREE.Scene();
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
        scene.background = new THREE.Color("#A9A9A9");
    }

    //const boxWidth = 1;
    //const boxHeight = 1;
    //const boxDepth = 1;
    //const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    var carregador = new THREE.GLTFLoader();

    carregador.load('MochilaFinal.gltf',
    function ( gltf ) {
      scene.add( gltf.scene )
      //clipe = THREE.AnimationClip.findByName( gltf.animations, 'KeyAction' )
      //acao = misturador.clipAction( clipe )
      gltf.scene.position.x = 0;

    })

    /*//Adicionar Objetos à Cena
    function makeInstance(geometry, color, x) 
    {
        const material = new THREE.MeshPhongMaterial({color});
    
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    
        cube.position.x = x;
    
        return cube;  
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
    ];*/

    function resizeRendererToDisplaySize(renderer) 
    {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time)
    {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix(colorButton.style.background);
        }

        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
   }
   controlos.addEventListener( 'change', render );
   
   requestAnimationFrame(render);
    
}

main();