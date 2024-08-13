const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: sessionStorage.getItem("token") || null,
			user: JSON.parse(sessionStorage.getItem("user")) || null,
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			signup: async (email, password) => {
				try {
					
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					})
					if (response.ok) {
						return true
					} else {
						console.error("Fallo sign up")
						return false
					  }

				} catch (error) {
					console.log("Error sign up", error)
				  }
			},

			login: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

					if (response.status !== 201) {
						console.error("Error"); 
						
                        return false;
					}

					const data = response.json()
					sessionStorage.setItem("token", data.token);
                    setStore({ token: data.token });
                    return true;

				

				} catch(error) {
					console.log("ERROR CATCH:", error)
				}
			},

			isLoggedIn: () => {
				const token = sessionStorage.getItem('token');
				return !!token;
			},

			getProfileInfo: async (email, password) => {
				setStore({ ...getStore(), error: null });
				try {
					const resp = await fetch(process.env.BACKEND_URL + 'api/profileInfo', {
						method: 'GET',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + sessionStorage.getItem('token')
						},
						body: JSON.stringify({
							email, password
						})
					});
					const data = await resp.json();
					setStore({ ...getStore(), userInfo: data });

				} catch {
					setStore({ ...getStore(), error: "Error obteniendo informacion de usuario" });
				}
			},

			logout: () => {
				sessionStorage.removeItem("token");
                setStore({ token: null });
			}
		}
	};
};

export default getState;
