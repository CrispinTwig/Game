const svgConfigs = {
    follower: {
        path: 'assets/optimized/Follower-symbols.svg',
        wrapperClass: 'face-wrapper',
        parts: {
            'back-hair': 4,
            'face': 2,
            'eyes': 4,
            'mouth': 3,
            'eyebrows': 2,
            'front-hair': 4
        },
        themes: {
            'hair': 10,
            'eyes': 6,
            'mouth': 1,
            'face': 3
        }
    }
};

class RandomiseSVG {
    constructor(config) {
        this.config = config;

        this.svgNS = 'http://www.w3.org/2000/svg';
        this.xlinkNS = 'http://www.w3.org/1999/xlink';
    }

    randomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    createFaceParams() {
        const parts = {};
        const themes = {};

        for (const part in this.config.parts) {
            parts[part] = this.randomNumber(this.config.parts[part]);
        }

        for (const part in this.config.themes) {
            themes[part] = this.randomNumber(this.config.themes[part]);
        }

        return { parts, themes };
    }

    createFaceSVG(config) {
        let faceConfig = config || this.createFaceParams();

        const svgWrapper = document.createElement('div');
        svgWrapper.classList.add(this.config.wrapperClass);

        const faceSVG = document.createElementNS(this.svgNS, 'svg');
        faceSVG.setAttribute('viewBox', '0 0 200 200');

        for (const part in this.config.themes) {
            faceSVG.classList.add(`${part}-theme-${faceConfig.themes[part]}`);
        }

        for (const part in this.config.parts) {
            const symbolId = `${part}-${faceConfig.parts[part]}`;
            const use = document.createElementNS(this.svgNS, 'use');
            use.setAttributeNS(this.xlinkNS, 'xlink:href', `#${symbolId}`);
            use.setAttribute('class', `${part}`);
            faceSVG.appendChild(use);
        }

        svgWrapper.appendChild(faceSVG);

        return svgWrapper;
    }
}

const follower = new RandomiseSVG(svgConfigs.follower);






// Render out any existing recruits

const faceContainer = document.createElement('div');
faceContainer.classList.add('face-wrapper-container');

document.querySelector('#app').appendChild(faceContainer);

function placeFaceSVG() {
    const faceItem = follower.createFaceSVG(follower.createFaceParams());
    document.querySelector('.face-wrapper-container').appendChild(faceItem);
}

for(let i = 0; i < 10; i++) {
    placeFaceSVG();
}
