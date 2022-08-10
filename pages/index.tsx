import { Image, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { GradientLayout } from "../components/gradientLayout";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";

const Home = ({ artists }) => {
	const { user, isLoading } = useMe();
	return (
		<GradientLayout
			roundImage
			color="green"
			subtitle="profile"
			title={`${user?.firstName} ${user?.lastName}`}
			description={`${user?.playlistsCount} public playlists`}
			image="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
		>
			<Box color="white" paddingX="40px">
				<Box marginBottom="40px">
					<Text fontSize="2xl" fontWeight="bold">
						Top artist this month
					</Text>
					<Text fontSize="md">Only visible to you</Text>
				</Box>
				<Flex justify="">
					{JSON.parse(artists).map((artist) => (
						<Box paddingX="10px" width="20%">
							<Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
								<Image
									src="https://placekitten.com/300/300"
									borderRadius="100%"
								/>
								<Box marginTop="20px">
									<Text fontSize="large">{artist.name}</Text>
									<Text fontSize="x-small">Artist</Text>
								</Box>
							</Box>
						</Box>
					))}
				</Flex>
			</Box>
		</GradientLayout>
	);
};

export const getServerSideProps = async () => {
	const artists = JSON.stringify(await prisma.artist.findMany({}));

	return {
		props: { artists },
	};
};

export default Home;
