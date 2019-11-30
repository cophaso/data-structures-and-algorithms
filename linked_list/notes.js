const myArray = []; //new Array(50)


const q1 = {
    data: 400
};

const q2 = q1;


class Node {
    constructor(data, next = null){
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    push(data) {
       // if the list is empty
       if (!this.head) {
           this.head = new Node(data);
           this.size++;
       } else {
           let current = this.head;
           while (current.next) {
               current = current.next;
           }
           current.next = new Node(data);
           this.size++;
       }
    }

    insertAtFirst(data) {
        this.head = new Node(data, this.head);
        this.size++;
    }

    insertAt(idx, data) {
        // out of range
        if (idx > 0 && idx > this.size) {
            console.log('Out of range');
            return;
        }

        if(idx === 0) {
            this.insertAtFirst(data);
            return;
        }

        const node = new Node(data);
        let current, previous, counter;
        counter = 0;
        current = this.head;

        while(counter < idx) {
            counter++;
            previous = current;
            current = current.next;
        }
        previous.next = node;
        node.next = current;
        this.size++;
    }

    pop() {
        // sanity check if list is empty
        if(!this.head) return;
        this.head = this.head.next;
        this.size--;
    }

    removeAt(idx) {
        // out of range
        if (idx > 0 && idx > this.size) {
            console.log('Out of range');
            return;
        }

        if(idx === 0) {
            this.pop();
            return;
        } else {
            let previous, current, counter;
            current = this.head;
            counter = 0;

            while(idx < counter) {
                counter++;
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
            this.size--;
        }
    }
}


