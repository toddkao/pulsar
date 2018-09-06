#include "headers/NavigatorTile.h"

NavigatorTile::NavigatorTile(): position(Vector()), isObstacle(false) {
}

NavigatorTile::NavigatorTile(Vector position) {
    this -> position = position;
    this -> isObstacle = false;
}

bool NavigatorTile::isDiagonal(NavigatorTile tile) {
    return position.x != tile.position.x && position.y != tile.position.y;
}