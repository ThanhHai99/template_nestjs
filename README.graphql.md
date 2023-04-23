### Graphql Request Example

1. createOrder

```code
mutation {
  createOrder(body: {
    name: "Trần Viết Thanh Hải"
  }){
    id,
    name,
    created_at,
  }
}
```

2. findAll

```code
query {
  getOrders {
    code,
    message {
      vi
    },
    data {
      id,
      name,
      created_at,
    }
  }
}
```

3. findOne

```code
query {
  getOrder(id:"94d45572-9313-1e4c-a5e9-f42ae608d959") {
    code,
    message {
      vi
    },
    data {
      id,
      name,
      created_at,
    }
  }
}
```

4. updateOrder

```code
mutation {
  updateOrder(body: {
    id: "a2095817-8be8-4296-90a2-663b31c10125",
    name: "Trần Viết Thanh Hải 2"
  }){
    id,
    name,
  }
}
```

5. removeOrder

```code
mutation {
	deleteOrder(id:"f0fc5795-8708-40cb-9323-a6efc4ea1906"){
    code,
    message {
      vi
    }
  }
}
```
