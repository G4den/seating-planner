class TempPerson
{
    constructor(name, likedPeople, dislikedPeople, prefferedRow)
    {
        this.name = name;
        this.likedPeople = likedPeople;
        this.dislikedPeople = dislikedPeople;
        this.prefferedRow = prefferedRow;
    }
}

export class SeatingPlanner
{
    constructor(people, layout)
    {
        this.layout = layout;
        this.inputPeople = people;
        this.people = [];
        this.proposals = [];
        this.iterations = 10000;
    }

    generate = () =>{      
        this.tempPeople = this.inputPeople.map(person => {
            return new TempPerson(person.name, person.likes, person.dislikes, person.preferredDistanceToWhiteboard)
        })
        
        this.tempPeople.forEach(person => {
            this.people.push(new Person(person.name));
        });

        for (let i = 0; i < this.people.length; ++i)
        {
            this.people[i].updatePreferences(this, this.tempPeople[i]);
        }

        this.solve();

        console.log(this.proposals[0])
        const rows = []
        for(let i=0; i<this.proposals[0].positions[this.proposals[0].positions.length - 1].row; i++){
            rows.push([])
        }

        for(let i=0; i< this.proposals[0].positions.length; i++){
            const rowIndex = this.proposals[0].positions[i].row - 1;
            console.log(`Pushing row index ${rowIndex}`)
            rows[rowIndex].push(this.proposals[0].positions[i].people.map(person => person.name))
        }

        console.log(rows)
        return rows;
    }

    solve = () => {
        for(let it = 0; it < this.iterations; it++)
        {
            let curPeople = [...this.people];

            let curPositions = [];

            curPeople = shuffleArray(curPeople);

            let row = 0;
            let tableInRow = 0;

            while(curPeople.length > 0)
            {
                let group = [curPeople[0]];


                for(let j = 0; j < this.layout[row][tableInRow] - 1; j++)
                {
                    let i = 1;
                    let checkNormal = false;

                    while(curPeople.length > 1)
                    {
                        if(!checkNormal)
                        {
                            if(curPeople[0].likedPeople.includes(curPeople[i]))
                            {
                                group.push(curPeople[i]);

                                curPeople.splice(i, 1);
                                break;
                            }
                        }
                        else
                        {
                            if(!(curPeople[0].dislikedPeople.includes(curPeople[i])))
                            {
                                group.push(curPeople[i]);
                                curPeople.splice(i, 1);
                                break;
                            }
                        }

                        i++;
                        if(i == curPeople.length)
                        {
                            if(checkNormal)
                            {
                                break;
                            }

                            i = 1;
                            checkNormal = true;
                        }
                    }
                }
                curPeople.splice(0, 1);
                curPositions.push(new Position(group, row +1));

                tableInRow++;
                if(tableInRow == this.layout[row].length)
                {
                    tableInRow = 0;
                    row++;
                }
            }

            this.proposals.push(new RoomProposal(curPositions));
        }

        const objectComparisonCallback = (arrayItemA, arrayItemB) => {
            if (arrayItemA.score > arrayItemB.score) {
              return -1
            }
          
            if (arrayItemA.score < arrayItemB.score) {
              return 1
            }
          
            return 0
          }

        this.proposals.sort(objectComparisonCallback);        
    }

    nameToPerson = (name) =>{

        //console.log("start");

        for (let i = 0; i < this.people.length; i++) {
            if(this.people[i].name == name)
            {
                return this.people[i];
            }   
        }
        return null;
    }
}

class RoomProposal
{
    constructor(positions)
    {
        this.positions = positions;
        this.score = 0;
    }

    calculateRoomScore = () =>
    {
        this.positions.forEach(position => {
            this.score += position.calculatePositionScore();
        });
    }

    print = () =>
    {
        console.log(this.positions)
    }
}

class Position
{
    constructor(people, row)
    {
        this.people = people;
        this.row = row;
    }

    calculatePositionScore = () =>{
        let score = 0;

        this.people.forEach(person => {
            score += person.calculateScore(this);
        });

        return score;
    }
}

class Person
{
    constructor(name)
    {
        this.name = name;

        this.likedPeople = [];
        this.dislikedPeople = [];
        this.prefferedRow = 0;
    }

    updatePreferences = (sp, tempPerson) => {
        tempPerson.likedPeople.forEach(person => {
            var p = sp.nameToPerson(person);

            if(p != null)
            {
                this.likedPeople.push(sp.nameToPerson(person));
            }
        });

        tempPerson.dislikedPeople.forEach(person => {
            var p = sp.nameToPerson(person);

            if(p != null)
            {
                this.dislikedPeople.push(sp.nameToPerson(person));
            }
        });

        this.prefferedRow = tempPerson.prefferedRow;
    }

    calculateScore = (position) => {
        let score = 0;

        position.people.forEach(person => {
            if(this.likedPeople.includes(person)){
                score += 2;
            }
            else if(this.dislikedPeople.includes(person))
            {
                score -= 5;
            }
        });

        score -= Math.abs(this.prefferedRow - position.row);

        return score;
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
    
        // Generate random number
        let j = Math.floor(Math.random() * (i + 1));
                    
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
        
    return array;
 }

