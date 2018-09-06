#include <iostream>
#include "Common/headers/Vector.h"
#include "Navigator/headers/NavigatorTile.h"
#include "Navigator/headers/Grid.h"
using namespace std;

int main() 
{    
    Vector positionA(0, 0);
    Vector positionB(1, 0);

    NavigatorTile tileA(positionA);
    NavigatorTile tileB(positionB);
    
    cout << boolalpha << tileA.isDiagonal(tileB) << endl;

    int width = 2;
    int heigh = 2;

    Grid grid(width, heigh);

    for (int i = 0; i < width * heigh; i++) {
        cout << "[x:" << grid.tiles[i].position.x << " y:" << grid.tiles[i].position.y << "]" << endl;
    }
    return 0;
}

