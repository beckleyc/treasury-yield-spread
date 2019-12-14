import { compact } from 'lodash';

export const smokeTest = () => {
    console.log('Starting index.ts');

    enum Status {
        Good = 'good',
        Okay = 'okay',
        Bad = 'bad'
    }
    
    let testArray = [0, 1, 2, 4, false, -0];
    console.log('TestArray=', compact(testArray));
    
    const currentStatus = Status.Good;
    
    console.log(`Current status is ${currentStatus}`);
}


