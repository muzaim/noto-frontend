type FetcherOptions<T> = {
	data: T;
	delay?: number;
};

export async function fakeFetch<T>({
	data,
	delay = 350,
}: FetcherOptions<T>): Promise<T> {
	return new Promise((resolve) => {
		window.setTimeout(() => resolve(data), delay);
	});
}
