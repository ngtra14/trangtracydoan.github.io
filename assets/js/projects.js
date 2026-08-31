(() => {
	const collage = document.querySelector("[data-project-collage]");

	if (!collage) {
		return;
	}

	const usedRanks = new Set();
	const featuredProjects = Array.from(document.querySelectorAll(".project-feature[data-featured-rank]"))
		.map((project) => ({
			project,
			rank: Number(project.dataset.featuredRank),
		}))
		.filter(({ project, rank }) => {
			const hasRequiredContent = project.id && project.querySelector(".project-feature-media img");
			const hasValidRank = Number.isInteger(rank) && rank >= 1 && rank <= 3;

			if (!hasRequiredContent || !hasValidRank || usedRanks.has(rank)) {
				return false;
			}

			usedRanks.add(rank);
			return true;
		})
		.sort((first, second) => first.rank - second.rank)
		.slice(0, 3);

	if (featuredProjects.length === 0) {
		return;
	}

	const tiles = document.createDocumentFragment();

	featuredProjects.forEach(({ project }, index) => {
		const sourceImage = project.querySelector(".project-feature-media img");
		const projectTitle = project.querySelector("h3")?.textContent.trim() || "featured project";
		const tile = document.createElement("a");
		const image = sourceImage.cloneNode(false);

		tile.className = index === 0 ? "collage-tile collage-tile-main" : "collage-tile";
		tile.href = `#${project.id}`;
		tile.setAttribute("aria-label", `Jump to ${projectTitle}`);

		image.loading = "eager";
		tile.append(image);
		tiles.append(tile);
	});

	collage.replaceChildren(tiles);
	collage.classList.add(`collage-count-${featuredProjects.length}`);
	collage.hidden = false;
	collage.closest(".page-hero-shell")?.classList.add("has-collage");
})();
