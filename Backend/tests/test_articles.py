def test_article_routes_exist(client):
    list_response = client.get("/articles/?page=1&size=5")
    assert list_response.status_code == 200

    search_response = client.get("/articles/search", params={"q": "Ethiopia", "page": 1, "size": 5})
    assert search_response.status_code == 200

    categories_response = client.get("/categories/")
    assert categories_response.status_code == 200
