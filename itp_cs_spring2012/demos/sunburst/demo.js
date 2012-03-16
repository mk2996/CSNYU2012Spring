    //Create jsGraphics object
    var gr = new jsGraphics(document.getElementById("canvas"));

    //Create jsColor object
    var col = new jsColor("red");

    //Create jsPen object
    var pen = new jsPen(col,1);

    //Draw a Line between 2 points
    var pt1 = new jsPoint(20,30);
    var pt2 = new jsPoint(120,230);
    gr.drawLine(pen,pt1,pt2);

    //Draw filled circle with pt1 as center point and radius 30.
    gr.fillCircle(col,pt1,30);

    //You can also code with inline object instantiation like below
    gr.drawLine(pen,new jsPoint(40,10),new jsPoint(70,150)); 