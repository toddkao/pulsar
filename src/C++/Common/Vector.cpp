#include <iostream>
#include "headers/Vector.h"
using namespace std;

Vector::Vector(): x(0), y(0) {}

Vector::Vector(int x, int y) {
    this -> x = x;
    this -> y = y;
}