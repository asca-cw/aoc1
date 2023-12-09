class aoc3{

    private fs = require('fs');

    private data: string [];
    private num_pos: number [][];
    private sym_pos: number[][];

    private gear_pos: number[][];

    private valid_coord: number[][];
    private numbers: any [];

    private gear_ratio:any [];

    constructor(path:string) { 
        let data:string = this.fs.readFileSync(path,'utf8');
        this.num_pos = [];
        this.sym_pos = [];

        this.gear_pos = [];

        this.valid_coord = [];
        this.numbers = [];
        this.gear_ratio = [];

        let lines:any = [];
        data.split('\n').forEach((line, i) =>{
            lines.push(line);
            this.num_pos[i] = [];
            this.sym_pos[i] = [];
            this.gear_pos[i] = [];
            for (let j:number = 0; j < line.length; j++){
                if (this.isNumber(line.charAt(j))) {
                    this.num_pos[i].push(j);
                }
                if (this.isSymbole(line.charAt(j))) {
                    this.sym_pos[i].push(j);
                }
                if (this.isGear(line.charAt(j))) {
                    this.gear_pos[i].push(j);
                };
            }
        });
        this.data = lines;
    }
    private isNumber(char: string):boolean {
        return /^\d$/.test(char);
    }
    private isSymbole(char: string):boolean {
        return !/^[0-9\.]+$/i.test(char);
    }
    private isGear(char: string):boolean {
        return /^[\*]$/.test(char)
    }

    cal_valid_coord(){
        for (let i:number = 0; i<this.sym_pos.length; i++){
            for (let j:number = 0; j<this.sym_pos[i].length; j++){
                this.valid_coord.push([i-1, this.sym_pos[i][j]-1]);
                this.valid_coord.push([i-1, this.sym_pos[i][j]]);
                this.valid_coord.push([i-1, this.sym_pos[i][j]+1]);
                this.valid_coord.push([i, this.sym_pos[i][j]-1]);
                this.valid_coord.push([i, this.sym_pos[i][j]+1]);
                this.valid_coord.push([i+1, this.sym_pos[i][j]-1]);
                this.valid_coord.push([i+1, this.sym_pos[i][j]]);
                this.valid_coord.push([i+1, this.sym_pos[i][j]+1]);
            }
        }
        let tmp:any = new Set(this.valid_coord.map(JSON.stringify));
        this.valid_coord = Array.from(tmp, JSON.parse)
        // console.log(this.valid_coord);
    }

    map_valid(){
        this.valid_coord.forEach((val) => {
            let x = val[0];
            let y = val [1];

            if (this.num_pos[x].includes(y)){
                let tmp = [];
                tmp.push(this.data[x][y]);

                let index = this.num_pos[x].indexOf(y);
                this.num_pos[x].splice(index, 1); 

                let start = 1;
                let stop = 1;
                while(this.num_pos[x].includes(y-start)){
                    tmp.unshift(this.data[x][y-start]);
                    let index = this.num_pos[x].indexOf(y-start);
                    this.num_pos[x].splice(index, 1); 
                    start += 1;

                }
                while(this.num_pos[x].includes(y+stop)){
                    tmp.push(this.data[x][y+stop]);
                    let index = this.num_pos[x].indexOf(y+stop);
                    this.num_pos[x].splice(index, 1); 
                    stop += 1;

                }
                
                this.numbers.push(Number(tmp.join().replaceAll(",", "")))
            }
        });
    }

    map_2(){
        for (let i:number = 0; i<this.gear_pos.length; i++){
            for (let j:number = 0; j<this.gear_pos[i].length; j++){
                let tmp = [];

                tmp.push([i-1, this.gear_pos[i][j]-1]);
                tmp.push([i-1, this.gear_pos[i][j]]);
                tmp.push([i-1, this.gear_pos[i][j]+1]);
                tmp.push([i, this.gear_pos[i][j]-1]);
                tmp.push([i, this.gear_pos[i][j]+1]);
                tmp.push([i+1, this.gear_pos[i][j]-1]);
                tmp.push([i+1, this.gear_pos[i][j]]);
                tmp.push([i+1, this.gear_pos[i][j]+1]);

                let nrs:any = [];
                tmp.forEach((val) => {
                    let x = val[0];
                    let y = val [1];
                    if (this.num_pos[x].includes(y)){
                        let sub_tmp = [];
                        sub_tmp.push(this.data[x][y]);

                        let index = this.num_pos[x].indexOf(y);
                        this.num_pos[x].splice(index, 1); 

                        let start = 1;
                        let stop = 1;
                        while(this.num_pos[x].includes(y-start)){
                            sub_tmp.unshift(this.data[x][y-start]);
                            let index = this.num_pos[x].indexOf(y-start);
                            this.num_pos[x].splice(index, 1); 
                            start += 1;

                        }
                        while(this.num_pos[x].includes(y+stop)){
                            sub_tmp.push(this.data[x][y+stop]);
                            let index = this.num_pos[x].indexOf(y+stop);
                            this.num_pos[x].splice(index, 1); 
                            stop += 1;

                        }

                        nrs.push(Number(sub_tmp.join().replaceAll(",", "")))
                    }

                });
                if (nrs.length == 2){
                    this.gear_ratio.push(nrs[0] * nrs[1]);
                }
            }
        }
    }
    print_sum(){
        let sum: number = 0;
        this.numbers.forEach(x => sum += x);
        console.log(sum)

    }
    print_sum2(){
        let sum: number = 0;
        this.gear_ratio.forEach(x => sum += x);
        console.log(sum)
    }
}

let obj = new aoc3("./data.txt")
obj.cal_valid_coord()
obj.map_valid()
obj.print_sum()

let obj1 = new aoc3("./data.txt")
obj1.map_2()
obj1.print_sum2()
