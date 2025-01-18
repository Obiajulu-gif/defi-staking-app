import React, { Component } from "react";
import Particles from "react-tsparticles";

/**
 * ParticleSettings component for rendering an interactive particle background.
 */
class ParticleSettings extends Component {
	render() {
		return (
			<div>
				<Particles
					height="1000px"
					width="100vw"
					id="tsparticles"
					options={{
						background: {
							color: {
								value: "#0d47a1", // Set the background color
							},
						},
						fpsLimit: 60, // Limit the frames per second
						interactivity: {
							detect_on: "canvas", // Detect interactions on the canvas
							events: {
								onClick: {
									enable: true,
									mode: "push", // Adds more particles on click
								},
								onHover: {
									enable: true,
									mode: "repulse", // Repulse effect on hover
								},
								resize: true, // Adjust particles when the window resizes
							},
						},
						particles: {
							color: {
								value: "#ffffff", // Color of the particles
							},
							links: {
								color: "#ffffff", // Link color between particles
								distance: 150, // Maximum distance to link particles
								enable: true,
								opacity: 0.5,
								width: 1,
							},
							collisions: {
								enable: true, // Enable particle collision
							},
							move: {
								direction: "none", // Random direction
								enable: true,
								outMode: "bounce", // Particles bounce when they hit the edge
								random: false,
								speed: 2, // Speed of particle movement
								straight: false,
							},
							number: {
								density: {
									enable: true,
									value_area: 800, // Particle density area
								},
								value: 50, // Number of particles
							},
							opacity: {
								value: 0.5, // Opacity of particles
							},
							shape: {
								type: "circle", // Shape of the particles
							},
							size: {
								random: true,
								value: 5, // Particle size
							},
						},
						detectRetina: true, // Optimize for retina screens
					}}
				/>
			</div>
		);
	}
}

export default ParticleSettings;
