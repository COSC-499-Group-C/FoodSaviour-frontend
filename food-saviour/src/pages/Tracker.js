import PieChart from "./PieChart.js";

function Tracker() {
    const data = [{ label: 'Apples', value: 10 }, { label: 'Oranges', value: 20 }];

    let rad = getText();
    function getText() {
        let elem = document.getElementById("ir");
        let ir = 60;
        if (elem != null) {
            ir = parseFloat(elem.value);
        }

        return ir;
    }
    return (
        <div>
            <form>
                <fieldset>
                    <input type={"number"} step={"any"} name={"ir"} id={"ir"}/>
                    <button onClick={getText}/>
                </fieldset>
            </form>
            <PieChart
                data={data}
                width = {200}
                height = {200}
                innerRadius = {rad}
                outerRadius = {100}
            />
        </div>
        );
}

export default Tracker;