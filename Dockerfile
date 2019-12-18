FROM trzeci/emscripten:sdk-tag-1.38.31-64bit

RUN apt-get update
RUN apt-get install wget scons zlib1g zlib1g-dev -y

RUN wget https://www.zlib.net/zlib-1.2.11.tar.gz
RUN tar -xvf zlib-1.2.11.tar.gz
RUN rm zlib-1.2.11.tar.gz
RUN cd zlib-1.2.11 && ./configure && emmake make
RUN mv zlib-1.2.11 /zlib

ENV CPPPATH "/zlib"
ENV LIBPATH "/zlib"

WORKDIR /src

CMD emconfigure scons RELEASE=1 GTK=0 LUA=0 SYSTEM_LUA=0 CREATE_AVI=0 OPENGL=0 EMSCRIPTEN=1 && bash js_substitutions.sh
