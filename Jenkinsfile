pipeline {
    agent any
    environment {
        PROJECT_ID = "jenkins-415921"
        CLUSTER_NAME = "cluster-demo"
        LOCATION = "us-central1"
        CREDENTIALS_ID = 'jenkins-k8s'
    }
    stages {
        stage('pull from github repo'){
            steps{
                git "https://github.com/ammercado/project-typescript.git"
            }
        }
        stage('build docker image'){
            steps{
                sh "docker build -t mauikem/app-backend:${env.BUILD_ID} ."                
            }
        }
        stage('push docker image to dockerhub'){
            steps{
                withCredentials([string(credentialsId: 'id-docker-hub', variable: 'docker_pass')]) {
                    sh "docker login -u mauikem -p ${docker_pass}"
                }
                sh "docker push mauikem/app-backend:${env.BUILD_ID}"
            }
            
        }
        stage('deploy on k8 cluster'){
            steps{
                sh "sed -i 's/tagversion/${env.BUILD_ID}/g' backend-k8.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'backend-k8.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])   
            }
        }
    }
}