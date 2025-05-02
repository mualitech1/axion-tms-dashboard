
import { Job } from '@/types/job';

export interface GeoPosition {
  lat: number;
  lng: number;
  address: string;
}

export interface RoutePoint extends GeoPosition {
  jobId: string | number;
  estimatedArrival?: string;
  estimatedDuration?: number;
  status?: 'pending' | 'completed' | 'delayed';
}

export interface RouteData {
  waypoints: RoutePoint[];
  totalDistance: number; // in kilometers
  totalDuration: number; // in minutes
  optimized: boolean;
}

export interface OptimizationFactors {
  traffic: boolean;
  weather: boolean;
  historical: boolean;
  priority: boolean;
}

// This service would typically make API calls to a backend service
// For demo purposes, we simulate the optimization with mock data
export class RouteOptimizationService {
  /**
   * Generate optimized route based on job locations and optimization factors
   */
  static optimizeRoute(
    jobs: Job[], 
    factors: OptimizationFactors = { traffic: true, weather: true, historical: true, priority: true }
  ): Promise<RouteData> {
    // In a real implementation, this would call a backend API
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        // Convert jobs to waypoints
        const waypoints: RoutePoint[] = jobs.map(job => ({
          lat: this._getRandomCoordinate(51.5, 0.1),
          lng: this._getRandomCoordinate(-0.12, 0.1),
          address: job.origin || 'Unknown location',
          jobId: job.id,
          estimatedArrival: this._getFutureTime(1, 3),
          estimatedDuration: Math.floor(Math.random() * 45) + 15, // 15-60 minutes
          status: 'pending'
        }));
        
        // Apply optimization factors
        let optimizedWaypoints = [...waypoints];
        
        if (factors.priority) {
          // Sort by job priority
          optimizedWaypoints.sort((a, b) => {
            const jobA = jobs.find(j => j.id === a.jobId);
            const jobB = jobs.find(j => j.id === b.jobId);
            
            const priorityMap = { high: 3, medium: 2, low: 1 };
            const priorityA = jobA?.priority ? priorityMap[jobA.priority] : 0;
            const priorityB = jobB?.priority ? priorityMap[jobB.priority] : 0;
            
            return priorityB - priorityA;
          });
        }
        
        // In a real implementation, we would apply the other factors
        // to determine the optimal route
        
        resolve({
          waypoints: optimizedWaypoints,
          totalDistance: Math.floor(Math.random() * 80) + 20, // 20-100 km
          totalDuration: Math.floor(Math.random() * 120) + 60, // 60-180 minutes
          optimized: true
        });
      }, 1000);
    });
  }
  
  /**
   * Get weather conditions for a given location
   */
  static getWeatherData(location: GeoPosition): Promise<any> {
    // In a real implementation, this would call a weather API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          temperature: Math.floor(Math.random() * 25) + 0, // 0-25°C
          conditions: this._getRandomWeather(),
          precipitation: Math.random() * 100, // 0-100%
          windSpeed: Math.floor(Math.random() * 30), // 0-30 km/h
          alerts: Math.random() > 0.7 ? [{ type: 'rain', severity: 'moderate' }] : []
        });
      }, 500);
    });
  }
  
  /**
   * Get traffic conditions for a given route
   */
  static getTrafficConditions(start: GeoPosition, end: GeoPosition): Promise<any> {
    // In a real implementation, this would call a traffic API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          congestionLevel: Math.floor(Math.random() * 10), // 0-10
          incidents: Math.random() > 0.8 ? [{ type: 'accident', location: { lat: start.lat + 0.01, lng: start.lng + 0.01 } }] : [],
          averageSpeed: Math.floor(Math.random() * 60) + 20, // 20-80 km/h
          delayMinutes: Math.floor(Math.random() * 30) // 0-30 minutes
        });
      }, 500);
    });
  }
  
  /**
   * Get historical performance data for a route
   */
  static getHistoricalPerformance(route: GeoPosition[]): Promise<any> {
    // In a real implementation, this would query a database
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          averageCompletionTime: Math.floor(Math.random() * 60) + 30, // 30-90 minutes
          successRate: 85 + Math.floor(Math.random() * 15), // 85-100%
          commonDelays: Math.random() > 0.5 ? ['traffic', 'weather'] : ['customer unavailable'],
          pastPerformance: [
            { date: '2023-04-01', completionTime: 45, onTime: true },
            { date: '2023-04-02', completionTime: 60, onTime: false },
            { date: '2023-04-03', completionTime: 40, onTime: true }
          ]
        });
      }, 500);
    });
  }
  
  // Helper methods for generating mock data
  private static _getRandomCoordinate(base: number, variance: number): number {
    return base + (Math.random() - 0.5) * variance;
  }
  
  private static _getFutureTime(minHours: number, maxHours: number): string {
    const now = new Date();
    const futureTime = new Date(now.getTime() + (minHours + Math.random() * (maxHours - minHours)) * 60 * 60 * 1000);
    return futureTime.toISOString();
  }
  
  private static _getRandomWeather(): string {
    const conditions = ['clear', 'cloudy', 'rain', 'snow', 'fog', 'windy'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }
}
