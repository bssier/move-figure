import './global.css';

function moveTriangle(arg1: string, arg2: number): void {
    const mainButton: HTMLButtonElement = document.querySelector('.main-button') as HTMLButtonElement;
    const wrapper: HTMLDivElement = document.querySelector('.wrapper') as HTMLDivElement;
    const mainContentElement = document.getElementsByClassName('main-content');
    [...arguments].forEach((i) => {
        console.log(i);

         if (typeof i !== 'object') {
            const text = document.createElement('p');
            text.innerText = i;
            text.style.color = 'white';

            for (const element of Array.from(mainContentElement)) {
                element.appendChild(text);
            }
         }
    });
    const haveClassMove: boolean = wrapper.classList.contains('move');

    if (haveClassMove) {
        wrapper.classList.remove('move');
        wrapper.classList.add('reverse-move');
        mainButton.disabled = true;
        const  id = setTimeout((): void => {
            mainButton.disabled = false;
            clearTimeout(id);
        }, 2200);
    } else {
        wrapper.classList.remove('reverse-move');
        wrapper.classList.add('move');
        mainButton.disabled = true;
        const  id = setTimeout((): void => {
            mainButton.disabled = false;
            clearTimeout(id);
        }, 2200);
    }
};

function addListenerToButton(): void {
    const mainButton: HTMLButtonElement = document.querySelector('.main-button') as HTMLButtonElement;
    mainButton.addEventListener('click', moveTriangle.bind(null, '123  string', 123));
}

addListenerToButton();