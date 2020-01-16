

function main() 
{
    var colorButton = document.getElementById("colorButton");
    const canvas = document.querySelector('#container');
    const renderer = new THREE.WebGLRenderer({canvas});
    const camera = new THREE.PerspectiveCamera(100,2, 0.1, 100);
    camera.position.set( 0, 0, 0 );


    var controlos = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.set( 0, 5, 15);
    controlos.enablePan = false;
    controlos.maxDistance = 20;
    controlos.update();


    const scene = new THREE.Scene();


    var carregador = new THREE.GLTFLoader();
    

    function gltfLoad(cor)
    {
      carregador.load('MochilaFinal.gltf',
      function ( gltf ) 
      {
        scene.add( gltf.scene )
        var mixer = new THREE.AnimationMixer( gltf.scene );
        var clips = gltf.animations;

        clips.forEach( function ( clip ) {
          mixer.clipAction( clip ).play();
        } );

        if(cor == null)
        {
          scene.add( gltf.scene )
        }
        else
        {
          var model = gltf.scene;
          var newMaterial = new THREE.MeshStandardMaterial({color: cor}); //0xff0000
          model.traverse((o) => {
            if (o.isMesh) o.material = newMaterial;
          });
          scene.add( gltf.scene )
        }
        
      })
    }

    gltfLoad();
    scene.background = new THREE.Color("#C0C0C0");
    var luzAmbiente = new THREE.AmbientLight( "white" )
    luzAmbiente.position.set(5,3,5)
    scene.add(luzAmbiente)
    var luzPonto1 = new THREE.PointLight( "white" )
    luzPonto1.position.set( 0, 3, 3 )
    scene.add( luzPonto1 )
    var luzPonto2 = new THREE.PointLight( "white" )
    luzPonto2.position.set( 5, 3, 3 );
    scene.add( luzPonto2 )
    var luzPonto3 = new THREE.PointLight( "white" )
    luzPonto3.position.set(-5, -3, 5 );
    scene.add( luzPonto3 )
    var luzPonto4 = new THREE.PointLight( "white" )
    luzPonto4.position.set(0, -3, -3);
    scene.add(luzPonto4)

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
          camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
      
   }

   function renderCor(time)
    {
        time *= 0.001;
        var colorBotao = colorButton.style.background;
        alert(colorBotao);
        gltfLoad(0xff0000);
        

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
        

        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
      
   }

  

   controlos.addEventListener( 'change', render );
   $(".dropdown-menu a").click(renderCor);
   
   requestAnimationFrame(render);
    
}

main();