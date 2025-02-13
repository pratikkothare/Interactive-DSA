// script.js
import { initStack, push as pushStack, pop as popStack } from './stack.js';
import { push as pushLL, insertAt, removeLast, removeByValue } from './linkedlist.js';
import { createQueueUI, enqueue, dequeue } from './queue.js';
import { initializeBubbleSort, goForward, goBackward } from './bubble-sort.js';

document.addEventListener('DOMContentLoaded', () => {
  let dsType = "";
  let maxSize = 0;
  
  // Get DOM elements
  const dsSelect = document.getElementById('ds-select');
  const dsSizeInput = document.getElementById('ds-size');
  const sizeContainer = document.getElementById('size-container');
  const llRemoveOptions = document.getElementById('ll-remove-options');
  const llRemoveMode = document.getElementById('ll-remove-mode');
  const removalInput = document.getElementById('removal-input');
  const createDSBtn = document.getElementById('create-ds-btn');
  const elementInput = document.getElementById('element-input');
  const insertBtn = document.getElementById('insert-btn');
  const removeBtn = document.getElementById('remove-btn');
  const peekBtn = document.getElementById('peek-btn');
  
  const stackContainer = document.getElementById('stack-container');
  const llContainer = document.getElementById('ll-container');
  const queueContainer = document.getElementById('queue-container');
  
  // New elements for linked list insertion mode
  const llInsertOptions = document.getElementById("ll-insert-options");
  const llInsertMode = document.getElementById("ll-insert-mode");
  const insertionIndexInput = document.getElementById("insertion-index-input");
  
  // DS selection event
  dsSelect.addEventListener('change', () => {
    dsType = dsSelect.value;
    
    // Hide all DS containers initially
    stackContainer.style.display = "none";
    llContainer.style.display = "none";
    queueContainer.style.display = "none";
    document.getElementById('bubble-sort-section').style.display = "none";
    
    // For stack and queue, show size container
    if (dsType === "stack" || dsType === "queue") {
      sizeContainer.style.display = "block";
    } else {
      sizeContainer.style.display = "none";
    }
    
    // For linked list, show removal and insertion options
    if (dsType === "linked-list") {
      llRemoveOptions.style.display = "block";
      llInsertOptions.style.display = "block";
      peekBtn.style.display = "none";
    } else if (dsType === "queue") {
      llRemoveOptions.style.display = "none";
      llInsertOptions.style.display = "none";
      peekBtn.style.display = "block";
    } else {
      llRemoveOptions.style.display = "none";
      llInsertOptions.style.display = "none";
      peekBtn.style.display = "none";
    }
    
    if(dsType === "bubble-sort") {
      document.getElementById('bubble-sort-section').style.display = "block";
      // Disable DS-specific controls for bubble sort
      elementInput.disabled = true;
      insertBtn.disabled = true;
      removeBtn.disabled = true;
      peekBtn.disabled = true;
    }
  });
  
  // Toggle display of specific index input based on linked list insertion mode
  llInsertMode.addEventListener('change', () => {
    if (llInsertMode.value === "index") {
      insertionIndexInput.style.display = "block";
    } else {
      insertionIndexInput.style.display = "none";
    }
  });
  
  // Linked list removal mode toggle
  llRemoveMode.addEventListener('change', () => {
    if (llRemoveMode.value === "value") {
      removalInput.style.display = "block";
    } else {
      removalInput.style.display = "none";
    }
  });
  
  // Create DS button event
  createDSBtn.addEventListener('click', () => {
    dsType = dsSelect.value;
    if (!dsType) {
      alert("Please select a Data Structure.");
      return;
    }
    
    // Hide all DS containers initially
    stackContainer.style.display = "none";
    llContainer.style.display = "none";
    queueContainer.style.display = "none";
    document.getElementById('bubble-sort-section').style.display = "none";
    
    if (dsType === "stack") {
      maxSize = parseInt(dsSizeInput.value);
      if (isNaN(maxSize) || maxSize <= 0) {
        alert("Please enter a valid size (number greater than 0).");
        return;
      }
      // Reset stack and create UI
      initStack(stackContainer, maxSize);
      stackContainer.style.display = "block";
    } else if (dsType === "linked-list") {
      // Reset linked list and clear container
      llContainer.innerHTML = "";
      llContainer.style.display = "flex";
    } else if (dsType === "queue") {
      maxSize = parseInt(dsSizeInput.value);
      if (isNaN(maxSize) || maxSize <= 0) {
        alert("Please enter a valid size (number greater than 0).");
        return;
      }
      // Reset queue and create UI
      createQueueUI(maxSize);
      queueContainer.style.display = "block";
    } else if (dsType === "bubble-sort") {
      document.getElementById('bubble-sort-section').style.display = "block";
    }
    
    // Enable controls
    elementInput.disabled = false;
    insertBtn.disabled = false;
    removeBtn.disabled = false;
    peekBtn.disabled = false;
  });
  
  // Insert button event
  insertBtn.addEventListener('click', () => {
    const value = elementInput.value;
    if (value === "") {
      alert("Please enter an element value.");
      return;
    }
    if (dsType === "stack") {
      pushStack(value, stackContainer, maxSize);
    } else if (dsType === "linked-list") {
      // Get insertion mode from the dropdown for linked list insertion
      const mode = llInsertMode.value; // "first", "last", "middle", or "index"
      if (mode === "index") {
        const specificIndex = parseInt(insertionIndexInput.value);
        if (isNaN(specificIndex)) {
          alert("Please enter a valid index for insertion.");
          return;
        }
        insertAt(value, llContainer, "index", specificIndex);
      } else {
        insertAt(value, llContainer, mode);
      }
    } else if (dsType === "queue") {
      enqueue(value, queueContainer, maxSize);
    }
    elementInput.value = "";
  });
  
  // Remove button event
  removeBtn.addEventListener('click', () => {
    if (dsType === "stack") {
      popStack(stackContainer, maxSize);
    } else if (dsType === "linked-list") {
      if (llRemoveMode.value === "last") {
        removeLast(llContainer);
      } else if (llRemoveMode.value === "value") {
        const remVal = removalInput.value;
        if (remVal === "") {
          alert("Please enter a value to remove.");
          return;
        }
        removeByValue(remVal, llContainer);
      }
    } else if (dsType === "queue") {
      dequeue(queueContainer);
    }
  });
  
  // Peek button event for queue
  peekBtn.addEventListener('click', () => {
    if (dsType === "queue") {
      const cells = queueContainer.getElementsByClassName("queue-cell");
      if (cells.length > 0 && cells[0].textContent !== "") {
        alert("Front element: " + cells[0].textContent);
      } else {
        alert("Queue is empty!");
      }
    }
  });
  
  // Bubble sort event handlers
  document.getElementById('start-bubble-sort').addEventListener('click', () => {
    const inputStr = document.getElementById('bubble-input').value;
    initializeBubbleSort(inputStr);
  });
  
  document.getElementById('bubble-forward').addEventListener('click', () => {
    goForward();
  });
  
  document.getElementById('bubble-backward').addEventListener('click', () => {
    goBackward();
  });
  
  // Allow Enter key on controls to trigger creation/insertion
  dsSelect.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      createDSBtn.click();
    }
  });
  dsSizeInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      createDSBtn.click();
    }
  });
  elementInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      insertBtn.click();
    }
  });
});
