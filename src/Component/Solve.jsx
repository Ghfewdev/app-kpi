import Table1 from './Table1';

const Solve = () => {
    var a = Table1();
    var b = a.map(aa => [aa.fm_method, aa.fm_solve])
    console.log("Solve",b)
return(b)
}

export default Solve
