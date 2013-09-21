var AdjacencyListGraph = function() {

    var self = this;
    self.graph = {}

    self.addDirectedEdge = function(v1, v2) {
        if (self.graph[v1] === undefined) {
            self.graph[v1] = [];
        }
        self.graph[v1].push(v2)
    }

    self.addEdge = function(v1, v2) {
        self.addDirectedEdge(v1, v2);
        self.addDirectedEdge(v2, v1);
    }

    self.getNeighbours = function(v) {
        return self.graph[v]
    }
}

var AdjacencyMatrixGraph = function() {

    var self = this;
    self.values = {};
    self.index = {};
    self.graph = [];

    self.getIndexForValue = function(v){
        var index = self.values[v];
        return index === undefined ? -1 : index;
    }

    self.addColumnsForValue = function(v) {
        var column = self.graph.length;
        var newColumn = [];
        for (var i = 0 ; i < column ; i++) {
            self.graph[i].push(false);
            newColumn.push(false);
        }
        newColumn.push(false);
        self.graph.push(newColumn);
        self.values[v] = column;
        self.index[column] = v;
        return column;
    }

    self.getValueIndexAndAddItIfNotFound = function(v) {
        var index = self.getIndexForValue(v);
        return index == -1 ? self.addColumnsForValue(v) : index;
    }

    self.addDirectedEdge = function(v1, v2) {
        var i1 = self.getValueIndexAndAddItIfNotFound(v1);
        var i2 = self.getValueIndexAndAddItIfNotFound(v2);
        self.graph[i1][i2] = true;
    }

    self.addEdge = function(v1, v2) {
        self.addDirectedEdge(v1, v2);
        self.addDirectedEdge(v2, v1);
    }

    self.getNeighbours = function(v) {
        var column = self.values[v];
        var result = [];
        for (var i = 0 ; i < self.graph.length ; i ++) {
            if (self.graph[column][i]) {
                result.push(self.index[i]);
            }
        }
        return result;
    }
}