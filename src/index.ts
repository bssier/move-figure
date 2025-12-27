import './global.css';

const moveTriangle = (): void => {
    const mainButton: HTMLButtonElement = document.querySelector('.main-button') as HTMLButtonElement;
    const wrapper: HTMLDivElement = document.querySelector('.wrapper') as HTMLDivElement;
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
    mainButton.addEventListener('click', moveTriangle);
}

addListenerToButton();