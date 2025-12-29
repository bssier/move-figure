import './global.css';

const figure: HTMLDivElement = document.querySelector('.main-content') as HTMLDivElement;
const emptiesBlocks: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('.empty');

const moveTriangle = function (arg1: string, arg2: number): void {
    const mainButton: HTMLButtonElement = document.querySelector('.main-button') as HTMLButtonElement;
    const wrapper: HTMLDivElement = document.querySelector('.wrapper') as HTMLDivElement;
    const mainContentElement = document.getElementsByClassName('main-content');
    [...arguments].forEach((i) => {
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
        const id = setTimeout((): void => {
            mainButton.disabled = false;
            clearTimeout(id);
        }, 2200);
    } else {
        wrapper.classList.remove('reverse-move');
        wrapper.classList.add('move');
        mainButton.disabled = true;
        const id = setTimeout((): void => {
            mainButton.disabled = false;
            clearTimeout(id);
        }, 2200);
    }
};

function addListenerToButton(): void {
    const mainButton: HTMLButtonElement = document.querySelector('.main-button') as HTMLButtonElement;
    mainButton.addEventListener('click', moveTriangle.bind(null, '123  string', 123));
}

const dragStartFigure = (e: DragEvent): void => {
    const mainButton: HTMLButtonElement = document.querySelector('.main-button') as HTMLButtonElement;
    mainButton.disabled = true;
    if (e.dataTransfer === null) {
        throw new Error('Data transfer is null');
    }
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', (e.target as HTMLElement).id);

    setTimeout(() => {
        if (e.target === null) {
            throw new Error('Target is null');
        }
        (e.target as HTMLElement).classList.add('dragging');
    }, 0);
};

const dragEndFigure = (e: DragEvent): void => {
    (e.target as HTMLElement).classList.remove('dragging');
};
const dragEnterItem = (e: DragEvent): void => {
    (e.target as HTMLElement).classList.add('hovered');
};
const dragLeaveItem = (e: DragEvent): void => {
    (e.target as HTMLElement).classList.remove('hovered');
};

const dragOverItem = (e: DragEvent): void => {
    e.preventDefault();
    if (e.dataTransfer === null) {
        console.log('Data transfer is null');
    } else {
        e.dataTransfer.dropEffect = 'move';
    }
};

const dropItem = (e: DragEvent): void => {
    e.preventDefault();
    if (e.target === null) {
        throw new Error('Target is null');
    } else {
        (e.target as HTMLElement).classList.remove('hovered');
        if (e.dataTransfer === null) {
            throw new Error('Data transfer is null');
        }
        const itemId = e.dataTransfer.getData('text/plain');
        const draggedElement: HTMLDivElement = document.getElementById(itemId) as HTMLDivElement;
        (e.target as HTMLElement).appendChild(draggedElement);
    }
};

figure.addEventListener('dragstart', dragStartFigure);
figure.addEventListener('dragend', dragEndFigure);
emptiesBlocks.forEach((item: HTMLElement): void => {
    item.addEventListener('dragenter', dragEnterItem);
    item.addEventListener('dragleave', dragLeaveItem);
    item.addEventListener('dragover', dragOverItem);
    item.addEventListener('drop', dropItem);
});

addListenerToButton();