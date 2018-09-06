objects = main.cpp Common/Vector.cpp Navigator/NavigatorTile.cpp Navigator/Grid.cpp

all: $(objects)
	g++ -std=c++11 -o a.out $(objects) -Wc++11-extensions

wa: $(objects)
	emcc -std=c++11 -O2 $(objects) 

clean:
	$(RM) a.out