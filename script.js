function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);
  
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
  
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });
  
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }
locomotiveAnimation();


function navbarAnimation() {
    gsap.to("#nav-part1 svg", {
      transform: "translateY(-100%)",
      scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        start: "top 0",
        end: "top -5%",
        scrub: true,
      },
    });
    gsap.to("#nav-part2 #links", {
      transform: "translateY(-100%)",
      opacity: 0,
      scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        start: "top 0",
        end: "top -5%",
        scrub: true,
      },
    });
  }
  navbarAnimation()

function videoConAnimation(){
    videoCon = document.querySelector("#video-container")
playbtn = document.querySelector("#play")

videoCon.addEventListener("mouseenter",()=>{
    gsap.to(playbtn,{
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut"
    })
})

videoCon.addEventListener("mouseleave",()=>{
    gsap.to(playbtn,{
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
    })
})

videoCon.addEventListener("mousemove",(e)=>{
    gsap.to(playbtn,{
        left: e.x-70,
        top: e.y-100,

    })
})
}

videoConAnimation()

function loadAnimation(){
    gsap.from("#page1 h1",{
        opacity: 0,
        y: 50,
        duration:1.5,
        stagger: 0.5,
        delay:0.5
    })
    gsap.from("#page1 #video-container",{
        opacity: 0,
        scale:0.9,
        duration:0.3,
        delay:1.5
    })
}

loadAnimation()

document.addEventListener("mousemove",(e)=>{
    gsap.to("#cursor",{
        left: e.x,
        top: e.y,
        scale: 1,
    })
})

document.querySelector(".child1").addEventListener("mouseenter",()=>{
    gsap.to("#cursor",{
        transform: "translate(-50%,-50%) scale(1)",
    })
})

