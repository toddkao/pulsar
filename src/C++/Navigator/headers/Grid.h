#include "NavigatorTile.h"
#include "../../Common/headers/Vector.h"
using namespace std;

#ifndef GRID_H_
#define GRID_H_

class Grid {
    public:
        Grid();
        Grid(int width, int height);
        ~Grid();
        NavigatorTile *tiles;
    private:
        int width;
        int height;

    public:
        NavigatorTile findTile(Vector position);
    private:
        void makeGrid();
        int getTileIndex(Vector position);
};

#endif
