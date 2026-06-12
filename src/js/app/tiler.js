const grid = document.getElementById("grid");
var width = 0;
var height = 0;

document.getElementById("generate").addEventListener("click", () => {
    console.log("Generate Table");
    document.getElementById("time").innerText = "";
    grid.innerHTML = "";
    width = parseInt(document.getElementById("width").value);
    height = parseInt(document.getElementById("height").value);
    for (let i = 0; i < height; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < width; j++) {
            let cell = document.createElement("td");
            let inp = document.createElement("input");
            inp.type = "text";
            inp.pattern = "^\\d{4}\\sI(V|I{1,2})?$";
            inp.id = `${i}_${j}`;
            inp.className = "cell";
            inp.placeholder = "-";
            cell.appendChild(inp);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
});

const dx = [ -1, 0, 1, 0 ] // x+ >
const dy = [ 0, -1, 0, 1 ] // y+ v

const mp_idx = {
    "I": 0,
    "II": 1,
    "III": 2,
    "IV": 3
};

const table = [
    [ [0, 0, 3], [0, 1, 1], [1, 0, 3], [0, 0, 1] ],
    [ [0, 0, 2], [0, 0, 0], [1, 0, 2], [0, -1, 0] ],
    [ [-1, 0, 1], [0, 0, 3], [0, 0, 1], [0, -1, 3] ],
    [ [-1, 0, 0], [0, 1, 2], [0, 0, 0], [0, 0, 2] ]
];

const str = [
    "I", "II", "III", "IV"
];

const dfs = (y, x, vist) => {
    vist[y][x] = true;
    let cell = document.getElementById(`${y}_${x}`);
    let xx = parseInt(cell.value.substring(0, 2));
    let yy = parseInt(cell.value.substring(2, 4));
    let type = cell.value.substring(5);
    for (let k = 0; k < 4; k++) {
        let nx = dx[k] + x;
        let ny = dy[k] + y;
        if (nx < 0 || nx >= width) { continue; }
        if (ny < 0 || ny >= height ) { continue; }
        if (vist[ny][nx]) { continue; }
        let nxt = document.getElementById(`${ny}_${nx}`);
        let t = mp_idx[type];
        let val = `${xx + table[t][k][0]}${yy + table[t][k][1]} ${str[table[t][k][2]]}`;
        if (nxt.value.length == 0) {
            nxt.value = val;
            nxt.style = "color: var(--text);";
            dfs(ny, nx, vist);
        }else if (nxt.value == val) {
            nxt.style = "color: #a6e3a1;";
            dfs(ny, nx, vist);
        }else { nxt.style = "color: var(--maroon);"; }
    }
}

document.getElementById("solve").addEventListener("click", () => {
    console.log("Solve");
    let bef = performance.now();
    let vist = Array.from(Array(height), () => new Array(width));
    fin = false;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (document.getElementById(`${i}_${j}`).value.length != 0) {
                document.getElementById(`${i}_${j}`).style = "color: var(--blue);";
                console.log(`${i} ${j} <`);
                try {
                    dfs(i, j, vist);
                }catch (_) {
                    alert("Too much recursion!");
                }
                fin = true;
                break;
            }
        }
        if (fin) { break; }
    }
    if (!fin) {
        document.getElementById(`${height - 1}_0`).value = "1010 III";
        document.getElementById(`${height - 1}_0`).style = "color: var(--blue);";
        try {
            dfs(height - 1, 0, vist);
        }catch (_) {
            alert("Too much recursion!");
        }
    }
    let aft = performance.now();
    document.getElementById("time").innerText = `Time taken: ${aft - bef} ms`;
})