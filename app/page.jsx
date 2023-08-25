async function fetchData() {
    
  try {
    const response = await fetch('http://localhost:3000/api/hello');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } 
  
  catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function fetchDataSpecific( id = 20) {
    
  try {
    const response = await fetch(`http://localhost:3000/api/hello/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } 
  
  catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}


export default async function Home() {
  const data = await fetchData();
  console.log(data);

  const dataSpecific = await fetchDataSpecific();
  console.log(dataSpecific);
  

  return (
   <div>
     hola mundo
   </div>
  )
}
