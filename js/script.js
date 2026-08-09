console.log("Website Loaded Successfully 🚀");

/* ---------------------------------------------------
   NETWORK BACKGROUND ANIMATION
   Full-page canvas of drifting, linking nodes —
   a nod to networking/cloud infrastructure.
--------------------------------------------------- */
(function () {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    const color = "37, 99, 235"; // matches --accent blue used across the site
    const linkDist = 150;
    const speed = 0.18;

    let width, height, nodes;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function nodeCount() {
        // fewer nodes on small screens for performance
        return Math.min(70, Math.round((width * height) / 22000));
    }

    function makeNodes() {
        const count = nodeCount();
        nodes = [];
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                r: Math.random() * 1.4 + 0.8
            });
        }
    }

    function step() {
        ctx.clearRect(0, 0, width, height);

        nodes.forEach(function (n) {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > width) n.vx *= -1;
            if (n.y < 0 || n.y > height) n.vy *= -1;
        });

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < linkDist) {
                    ctx.strokeStyle = `rgba(${color}, ${(1 - dist / linkDist) * 0.35})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        nodes.forEach(function (n) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color}, 0.7)`;
            ctx.fill();
        });

        requestAnimationFrame(step);
    }

    resize();
    makeNodes();

    if (prefersReducedMotion) {
        // draw one static frame only, respect reduced-motion preference
        ctx.clearRect(0, 0, width, height);
        nodes.forEach(function (n) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color}, 0.5)`;
            ctx.fill();
        });
    } else {
        step();
    }

    window.addEventListener("resize", function () {
        resize();
        makeNodes();
    });
})();