const Hero = () => {
  
  return (
    <div className="h-[60vh] min-h-1/3 bg-[url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1153&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
      <div className="bg-black/70">
        <h1 className="text-6xl font-extrabold uppercase text-white">
          my cookbook
        </h1>
        <p className="text-3xl text-white">
          Share your favorite recipes & discover new ones.
        </p>
       
      </div>
    </div>
  );
};

export default Hero;
