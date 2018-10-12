var numbers=[1,2,3,4,5,6,7,8,9,0];
var t9 = [
    [" "], // 0
    [""], // 1
    ["a", "b", "c"], // 2
    ["d", "e", "f"], // 3
    ["g", "h", "i"], // 4
    ["j", "k", "l"], // 5
    ["m", "n", "o"], // 6
    ["p", "q", "r", "s"], // 7
    ["t", "u", "v"], // 8
    ["w", "x", "y", "z"] // 9
];

let res=[];
// Doing phoneWords function in iteration only,to show I can do both recursive calls and regular iterations
function phoneWords(digits) {
     const digit=digits.split("");
     let count=0;
     const res= new Array();
    for (let i=0;i<digit.length;i++) {
           if (digit[i]===digit[i+1]) {
                    count=count+1;
           }
         else {
             count=Math.floor(count%3) //Fixes the input of same numbers more than 3 times
             console.log(count);
             res.push(t9[digit[i]][count])
             count=0;
         }
    }
     console.log(digit);
     return res;
}
function t9Words(digits, ret = []) {

  if (typeof digits === 'string') {
    digits = digits.split('').map(x => {
      return parseInt(x)
    })
  }

  if (!digits.length) return ret.sort()                           // recursion bottom case
  if (!ret.length) return t9Words(digits.slice(1), t9[digits[0]]) // top case

  const nextRet = t9[digits[0]].reduce((m, x) =>
    m.concat(ret.map(word => word.concat(x)))
  , [])

  return t9Words(digits.slice(1), nextRet)
}

class ResT9 extends React.Component {
    constructor(props) {
        super(props)
    }
 render () {
     return (
       <div id="res1" class="col-md-4"> {this.props.result.map(res=> <p id="resu" key={res}> {res}</p>)} </div> 
 )
 }
}
class Pads extends React.Component {
    constructor(props){
       super(props);
       this.state= {
          value:"" ,
          text: " ",
       };
      this.handleClick=this.handleClick.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
    }
 handleClick(e) {
     this.setState({value:this.state.value.concat(e.target.value)}, function () {
    console.log(this.state.value);
});   
        }
handleSubmit(e){
      const numbers=this.state.value.toString();
      if (e.target.value=="T9") res=t9Words(numbers);
      else res=phoneWords(numbers);
      this.setState({value:""});
}
 render () {
    return (<div class="container-fluid"> 
      <div id="numpads" class="row"> <div class="col-md-2"> {this.props.numbers.map((number)=> <button id="numpad" value={number} class="numpads" key={number.toString()} onClick={this.handleClick} > {number} {t9[number]}</button>)} </div>
         <div class="col-md-2"><p id="chosen" value={this.state.value}> Your selected number is: {this.state.value}  </p> </div>
        <ResT9 result={res}/>
      <div class="col-md-4"> <button class="choice" onClick={this.handleSubmit} value="PhoneWord"> Phoneword </button> <button class="choice" onClick={this.handleSubmit} value="T9"> T9 word </button> </div> </div>
       </div> );
 };
}
ReactDOM.render(<Pads numbers={numbers}/>,document.getElementById("root"));