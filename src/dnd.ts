document.addEventListener("DOMContentLoaded", () => {
    const dragItem = document.getElementById('drag-item');
    if (!dragItem) return;
    const dropZones = document.querySelectorAll<HTMLElement>('.drop-zone');
    if (!dropZones) return;

    const firstDropZone = dropZones[0];
    if (firstDropZone && dragItem) {
        firstDropZone.appendChild(dragItem);
    }

// Event fired when the user starts dragging an element
    dragItem.addEventListener('dragstart', (e) => {
        if (!e.dataTransfer) return;
        e.dataTransfer.effectAllowed = 'move'; // Specify the effect allowed
        e.dataTransfer.setData('text/plain', dragItem.id); // Set the data being dragged (e.g., the element's ID)

        // Add visual feedback
        setTimeout(() => {
            dragItem.classList.add('dragging');
        }, 0);
    });

// Event fired when the drag operation ends
    dragItem.addEventListener('dragend', (e) => {
        dragItem.classList.remove('dragging');
    });

// Events fired over the drop zone target
    dropZones.forEach(zone => {
        // Prevent default behavior to allow drop (default is to not allow dropping)
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = 'move';
            }
        });

        // Optional: Add visual feedback when the item enters the drop zone
        zone.addEventListener('dragenter', (e) => {
            if (e.target && zone.classList.contains('drop-zone')) {
                zone.classList.add('drop-zone-hover');
            }
        });

        // Optional: Remove visual feedback when the item leaves the drop zone
        zone.addEventListener('dragleave', (e) => {
            if (e.target && zone.classList.contains('drop-zone')) {
                zone.classList.remove('drop-zone-hover');
            }
        });

        // Event fired when the element is dropped
        zone.addEventListener('drop', (e) => {
            e.preventDefault(); // Prevent default browser behavior
            zone.classList.remove('drop-zone-hover');

            // Get the dragged element's ID from the dataTransfer object
            if (!e.dataTransfer) return;
            const itemId = e.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(itemId);

            // Append the dragged element to the drop zone
            if (draggedElement) {
                zone.appendChild(draggedElement);
            }
        });
    });
})