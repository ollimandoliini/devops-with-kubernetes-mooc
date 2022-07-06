const addTodo = async () => {
  const response = await fetch("https://en.wikipedia.org/wiki/Special:Random", {
    redirect: "manual",
  });
  const articleUrl = response.headers.get("location");
  console.log(articleUrl);

  await fetch("http://project-backend-svc/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: `Read ${articleUrl}` }),
  });
};

addTodo();
