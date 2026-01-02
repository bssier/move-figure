import './global.css';

const mainButtonOld: HTMLButtonElement = document.querySelector('.main-button__old') as HTMLButtonElement;
const wrapperOld: HTMLDivElement = document.querySelector('.wrapper__old') as HTMLDivElement;
const square: HTMLDivElement = document.querySelector('.main-content__old') as HTMLDivElement;

wrapperOld.style.transform = `translateX(0px)`;
wrapperOld.style.width = `100%`;
wrapperOld.style.minHeight = `200px`;
let wrapperWidth: number = wrapperOld.offsetWidth;

mainButtonOld.disabled = false;
let position = 0;

// Разобраться с типами. any - писать нельзя.
let variable: any | undefined = undefined;

function moveFigureRight(): void {
    if (wrapperOld) {
        mainButtonOld.disabled = true;

        square.style.display = 'flex';
        square.style.justifyContent = 'center';
        square.style.alignItems = 'center';
        square.style.borderRadius = `10px`;
        square.style.position = 'absolute';
        square.style.left = `${position}px`;
        square.innerText = `Туда =>`;

        variable = setInterval((): void => {
            position += 1;
            figureDirection(position);

            if (position >= wrapperWidth - square.offsetWidth) {
                clearInterval(variable);
                moveFigureLeft();
            }
        }, 1);
    } else {
        console.log(`wrapper. not Found`);
    }
}

function figureDirection(position: number) {
    square.style.left = `${position}px`;
}

function moveFigureLeft() {
    mainButtonOld.disabled = true;
    square.innerText = `<= Сюда`;

    variable = setInterval((): void => {
        position -= 1;
        figureDirection(position);

        if (position === 0) {
            clearInterval(variable);
            moveFigureRight();
        }
    }, 1);
}

function createStopButton(): void {
    const stopButton: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
    mainButtonOld.insertAdjacentElement(`afterend`, stopButton);
    stopButton.classList.add('stop-button');
    stopButton.innerText = `Stop`;

    stopButton.addEventListener('click', () => {
        clearInterval(variable);
        mainButtonOld.disabled = false;
        stopButton.remove();
    });
}

mainButtonOld.addEventListener('click', () => {
    moveFigureRight();
    createStopButton();
});