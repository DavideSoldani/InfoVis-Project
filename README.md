# InfoVis-Project
D3js Univeristy Project for the Infovis's class

Authors: Giorgia Marini, Andrea Serrecchia, Davide Soldani

Technologies: Javascript, D3.js , HTML

This project implements Schnyder realizers method to compute an automatic graph draw.

We have defined four graphs of differents degrees and two animations for drawing the arcs these have been be combined for creating another more complex animation.

Opening index.html a user can choose a graph and an animation, clicking on "draw" button the system shows the selected graph with the selected animation.


The main logic of the project is contained in:

Realizer.js that implements the code to find three realizers from a planar embedding ordered in canonical order.
Coordinates.js that implements the code to find grid coordinates from the realizers.
Draw.js that takes in input the coordinates and draws it with D3.js
