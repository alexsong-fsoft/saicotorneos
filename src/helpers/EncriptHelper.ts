import edge from 'edge-js';

// const myFunction = edge.func('async (input) => { return (int)input + 7; }');
// myFunction(5, function (error, result) {
//     console.log(`el resultado es ${result}`);
// });
// const result = myFunction(8, true);


export const encrip = edge.func({
    source: function () {`/*
        async (dynamic input) =>
        {
            var soma = new SiacWebDll.ClassGeneral().encrip(input.sTexto, input.sProceso);
            return soma;
        }
    */`},
    references: ["SiacWebDll.dll"]
});

