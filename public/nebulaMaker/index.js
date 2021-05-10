let scene, camera, cloudParticles = [],composer;
let isMobile;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

      function init(ele) {
        let height = window.innerHeight;
        let width = window.innerWidth;
        

        if(ele){
          height = getNumOf(window.getComputedStyle(ele).getPropertyValue("height"));
          width = getNumOf(window.getComputedStyle(ele).getPropertyValue("width"));
        }
        window.recs = {
          width: width,
          height: height
        }

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60,width / height,1,1000);
        camera.position.z = 1;
        camera.rotation.x = 1.16;
        camera.rotation.y = -0.12;
        camera.rotation.z = 0.27;

        let ambient = new THREE.AmbientLight(0x555555);
        scene.add(ambient);

        let directionalLight = new THREE.DirectionalLight(0xff8c19);
        directionalLight.position.set(0,0,1);
        scene.add(directionalLight);

        let orangeLight = new THREE.PointLight(0xb56711,50,450,1.7);
        orangeLight.position.set(-300,500, 000);
        scene.add(orangeLight);
        let redLight = new THREE.PointLight(0xd8547e,50,450,1.7);
        redLight.position.set(-100,500, 000);
        scene.add(redLight);
        let blueLight = new THREE.PointLight(0x3677ac,50,450,1.7);
        blueLight.position.set(-200,500, 000);
        scene.add(blueLight);

        /* let orangeLight = new THREE.PointLight(0xcc6600,50,450,1.7);
        orangeLight.position.set(200,300,100);
        scene.add(orangeLight);
        let redLight = new THREE.PointLight(0xd8547e,50,450,1.7);
        redLight.position.set(100,300,100);
        scene.add(redLight);
        let blueLight = new THREE.PointLight(0x3677ac,50,450,1.7);
        blueLight.position.set(300,300,200);
        scene.add(blueLight);*/

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        scene.fog = new THREE.FogExp2(0x172A21, 0.001);
        renderer.setClearColor(scene.fog.color);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.zIndex = -1;
        ele.appendChild(renderer.domElement);

        let loader = new THREE.TextureLoader();
        loader.load("./nebulaMaker/smoke.png", function(texture){
          cloudGeo = new THREE.PlaneBufferGeometry(500,500);
          cloudMaterial = new THREE.MeshLambertMaterial({
            map:texture,
            transparent: true
          });

          for(let p=0; p<50; p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
              Math.random()*800 -400,
              500,
              Math.random()*500-500
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random()*2*Math.PI;
            cloud.material.opacity = 0.55;
            cloudParticles.push(cloud);
            scene.add(cloud);
          }
        });
        loader.load("./nebulaMaker/stars.jpg", function(texture){

          const textureEffect = new POSTPROCESSING.TextureEffect({
            blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
            texture: texture
          });
          textureEffect.blendMode.opacity.value = 0.2;

          const bloomEffect = new POSTPROCESSING.BloomEffect({
                blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
                kernelSize: POSTPROCESSING.KernelSize.SMALL,
                useLuminanceFilter: true,
                luminanceThreshold: 0.3,
                luminanceSmoothing: 0.75
              });
          bloomEffect.blendMode.opacity.value = 1.5;

          let effectPass = new POSTPROCESSING.EffectPass(
            camera,
            bloomEffect,
            textureEffect
          );
          effectPass.renderToScreen = true;

          composer = new POSTPROCESSING.EffectComposer(renderer);
          composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
          composer.addPass(effectPass);
          
          window.addEventListener("resize", onWindowResize, false);
          render();
        });
      }
      function onWindowResize() {
        let width = window.innerWidth - (isMobile ? 0 : 17);
        let height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
      function render() {
        cloudParticles.forEach(p => {
          p.rotation.z -=0.001;
        });
        composer.render(0.1);
        requestAnimationFrame(render);
      }
      function getNumOf(pixString){
        return(pixString.split('px')[0]);
    }