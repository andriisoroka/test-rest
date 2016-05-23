export default function($resource){
  'ngInject';
  return {
  	getResource(url){
  		return $resource(`${url}/:Id/`,{Id:'@Id'},{
  			query: {
			  method: 'GET'
			},
			get: {
			  method: 'GET'
			},
			update: { method:'PUT' },
			save: { method:'POST' },
			delete: { method:'DELETE' }
  		})
  	}
  }
}
