#include <iostream>
#include "./headers/Grid.h"
using namespace std;

Grid::Grid(): width(0), height(0) {}

Grid::Grid(int width, int height) {
    this -> width = width;
    this -> height = height;

    tiles = new NavigatorTile[width * height];

    makeGrid();
}

Grid::~Grid() {
    delete tiles;
}

NavigatorTile Grid::findTile(Vector position) {
    int index = getTileIndex(position);
    return tiles[index];
}

void Grid::makeGrid() {
    for (int y = 0; y < width; y++) {
            for (int x = 0; x < height; x++) {
                Vector position(x, y);
                int index = getTileIndex(position);
                tiles[index] = NavigatorTile(position);
        }
    }
}


int Grid::getTileIndex(Vector position) {
    return position.x + position.y * width;
}