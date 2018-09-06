#include "../../Common/headers/Vector.h"

#ifndef NAVIGATOR_TILE_H_
#define NAVIGATOR_TILE_H_

class NavigatorTile {
    public:
        NavigatorTile();
        NavigatorTile(Vector position);

        Vector position;
        bool isObstacle;


        bool isDiagonal(NavigatorTile tile);
};

#endif
