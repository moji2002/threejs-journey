
the most types of textures
color => (or albedo) the most simple one 
alpha => grayscale images, black not visible
height => (or displacement) grayscale images, move the vertices to create some relief
normal => add details, doesn't need subdivision, won't move vertices
ambient occlusion => grayscale images, add fake shadows, not accurate, helps to create contrast and see details
metalness => grayscale images, white is metallic, mostly for reflection
roughness => it usually works with metalness, grayscale images, white is rough, mostly for light dissipation


textures (especially the metalness and the roughness) follow the PBR principles 
* physically based rendering
* many technics that tend to follow real-life directions to get realistic results
* becoming the standard for realistic renders
* many software, engines, and libraries are using it

